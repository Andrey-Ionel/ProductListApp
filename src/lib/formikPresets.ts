import * as yup from 'yup';
import { CONTAINS_ONLY_DIGITS_REGEX, isIos } from './constants';
import { FormTextInputType } from '../components/TextInput';

export function defineSchema(fields: yup.ObjectShape) {
  return yup.object().shape(fields);
}

const errorMessages = {
  required: 'This field is required',
};

export type FormFieldType = 'title' | 'price' | 'description';

export const regexSchemaPresets = () => {
  return {
    title: () => yup.string().required(errorMessages.required),
    price: yup
      .string()
      .matches(
        CONTAINS_ONLY_DIGITS_REGEX,
        'This field cannot contain special characters or letters',
      ),
    description: () => yup.string().required(errorMessages.required),
  };
};

export const textInputProps: Record<
  FormFieldType,
  Partial<FormTextInputType>
> = {
  title: {
    keyboardType: isIos ? 'name-phone-pad' : 'default',
    textContentType: 'givenName',
    returnKeyType: 'done',
  },
  price: {
    keyboardType: 'numeric',
    textContentType: 'givenName',
    returnKeyType: 'done',
  },
  description: {
    keyboardType: 'name-phone-pad',
    textContentType: 'givenName',
    returnKeyType: 'done',
  },
};
