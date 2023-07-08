import React, { FC, memo, useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';

import { ScreenWrapper } from './ScreenWrapper';
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
} from '../lib/formikPresets';
import { PSButton } from './PSButton';
import FormTextInput, { FormTextInputType } from './TextInput';
import { isIos, logError } from '../lib/constants';
import { Loading } from './Loading';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { AsyncStorageKeys, setStorageValue } from '../lib/asyncStorage';

import { Product } from '../dataSource/types';

import colors from '../styles/colors';
import { fonts } from '../styles/fonts';

export interface AddProductsFormProps {
  addProductRequest: (
    title: string,
    price: string,
    description: string,
  ) => Promise<void>;
  updateProductsRequest: (products: Product[]) => Promise<void>;
  products: Product[];
  error: string;
  navigation: NavigationProp<ParamListBase>;
}

interface AddProductFormFields {
  title: string;
  price: string;
  description: string;
}

interface FormFields {
  formFieldName: string;
  required: boolean;
  title: string;
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
    margin: 15,
    paddingBottom: 100,
  },
  errorIcon: {
    height: 12,
    width: 13,
    bottom: 2,
  },
  errorMessage: {
    fontFamily: fonts.gotham,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0.5,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  borderRect: {
    borderRadius: 0,
  },
  input: {
    paddingTop: 15,
    paddingBottom: 10,
    lineHeight: 17,
  },
  imageStyles: {
    height: 30,
    width: 30,
  },
});

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

export const AddProductsForm: FC<AddProductsFormProps> = memo(
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

    const addProduct: FormikConfig<AddProductFormFields>['onSubmit'] =
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

    const formikConfig: FormikConfig<AddProductFormFields> = {
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
              {(props: FormikProps<AddProductFormFields>) => {
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
                              field.formFieldName as keyof FormikErrors<AddProductFormFields>
                            ] || ''
                          }
                          required={field.required}
                          title={field.title}
                          formFieldName={field.formFieldName}
                          setFormikField={setFieldValue}
                          value={
                            values[
                              field.formFieldName as keyof AddProductFormFields
                            ]
                          }
                          touched={
                            !!touched[
                              field.formFieldName as keyof FormikTouched<AddProductFormFields>
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
