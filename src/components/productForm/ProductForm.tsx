import React, { FC, memo, useEffect, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import { ScreenWrapper } from '../ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import {
  Formik,
  FormikConfig,
  FormikErrors,
  FormikProps,
  FormikTouched,
} from 'formik';
import {
  defineSchema,
  FormFieldType,
  regexSchemaPresets,
  textInputProps,
} from '../../lib/formikPresets';
import { PSButton } from '../PSButton';
import FormTextInput, { FormTextInputType } from '../TextInput';
import { isIos, logError } from '../../lib/constants';
import { Loading } from '../Loading';
import { AsyncStorageKeys, setStorageValue } from '../../lib/asyncStorage';

import { FormFields, ProductFormFields, ProductFormProps } from './types';

import colors from '../../styles/colors';
import { styles } from './styles';

const commonInputProps = {
  errorIconStyle: styles.errorIcon,
  errorMessageStyle: styles.errorMessage,
  importantForAutofill: 'yes' as const,
};

const requiredText = 'This field is required';
const generateFormSchema = () =>
  defineSchema({
    title: regexSchemaPresets().title().required(requiredText),
    price: regexSchemaPresets().price.required(requiredText),
    description: regexSchemaPresets().description().required(requiredText),
  });

const addItemText = 'Add';

export const ProductForm: FC<ProductFormProps> = memo(
  ({ addProductRequest, products, navigation }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const setProducts = async () => {
        await setStorageValue(AsyncStorageKeys.productsData, products).catch(
          e => logError(e),
        );
      };

      setProducts().catch(e => logError(e));
    }, [products.length]);

    const addProduct: FormikConfig<ProductFormFields>['onSubmit'] =
      async values => {
        try {
          setLoading(true);
          await addProductRequest(
            values.title,
            values.price,
            values.description,
          )
            .then(async () => {
              setLoading(false);
              navigation.goBack();
            })
            .catch(() => setLoading(false));
        } catch (e) {
          setLoading(false);
        }
      };

    const formFields: FormFields[] = [
      {
        formFieldName: 'title',
        required: true,
        title: 'Product Name',
      },
      {
        formFieldName: 'price',
        required: true,
        title: 'Price',
      },
      {
        formFieldName: 'description',
        required: true,
        title: 'Description',
      },
    ];

    const formikConfig: FormikConfig<ProductFormFields> = {
      validateOnChange: true,
      validateOnBlur: true,
      validationSchema: generateFormSchema(),
      initialValues: {
        title: '',
        price: '',
        description: '',
      },
      onSubmit: addProduct,
    };

    if (loading) {
      return <Loading />;
    }

    return (
      <LinearGradient colors={colors.systemBackgroundGradient}>
        <ScreenWrapper
          screenStyle={styles.screenContainer}
          needInSafeArea={true}
          scroll={true}>
          <View style={styles.container}>
            <Formik {...formikConfig}>
              {(props: FormikProps<ProductFormFields>) => {
                const {
                  handleSubmit,
                  setFieldValue,
                  errors,
                  values,
                  touched,
                  setFieldTouched,
                  isValid,
                } = props;
                const isProductValue =
                  !!values.title.length &&
                  !!values.price.length &&
                  !!values.description.length;
                const isReadyToSubmit = isProductValue && isValid;

                const setTouched = (field: string) => () => {
                  setFieldTouched(field, true);
                };

                return (
                  <KeyboardAvoidingView
                    enabled
                    behavior={isIos ? 'padding' : 'height'}>
                    {formFields.map(field => {
                      return (
                        <FormTextInput
                          {...textInputProps[
                            field.formFieldName as keyof Record<
                              FormFieldType,
                              Partial<FormTextInputType>
                            >
                          ]}
                          textInputStyles={[styles.input, styles.borderRect]}
                          errorsMessage={
                            errors[
                              field.formFieldName as keyof FormikErrors<ProductFormFields>
                            ] || ''
                          }
                          required={field.required}
                          title={field.title}
                          formFieldName={field.formFieldName}
                          setFormikField={setFieldValue}
                          value={
                            values[
                              field.formFieldName as keyof ProductFormFields
                            ]
                          }
                          touched={
                            !!touched[
                              field.formFieldName as keyof FormikTouched<ProductFormFields>
                            ]
                          }
                          {...commonInputProps}
                          imageStyles={styles.imageStyles}
                          onBlur={setTouched(field.formFieldName)}
                          key={field.formFieldName}
                        />
                      );
                    })}
                    <PSButton
                      title={addItemText}
                      addProduct={handleSubmit}
                      disabled={!isReadyToSubmit || loading}
                    />
                  </KeyboardAvoidingView>
                );
              }}
            </Formik>
          </View>
        </ScreenWrapper>
      </LinearGradient>
    );
  },
);
