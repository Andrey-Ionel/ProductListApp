import * as yup from 'yup';
import { isIos } from './constants';
import { FormTextInputType } from '../components/TextInput';

export function defineSchema(fields: yup.ObjectShape) {
  return yup.object().shape(fields);
}

// const errorMessages = {
//   required: 'This field is required',
// };

export const zipRegExp = /^\d{5}(?:-\d{4})?$/;

// export const regexSchemaPresets = () => {
//   return {
//     phone: yup
//       .string()
//       .matches(/^[+]?[0-9]{1}[0-9 ]{3,20}$/, i18n.t('errors.phone')),
//     firstName: () =>
//       yup
//         .string()
//         .required(
//           i18n.t('joinNowForm.inputTitles.firstName') +
//             ' ' +
//             i18n.t('errors.required'),
//         )
//         .matches(/^[a-z-]+$/i, i18n.t('errors.validationSpecialCharacters')),
//     lastName: () =>
//       yup
//         .string()
//         .required(
//           i18n.t('joinNowForm.inputTitles.lastName') +
//             ' ' +
//             i18n.t('errors.required'),
//         )
//         .matches(/^[a-z-]+$/i, i18n.t('errors.validationSpecialCharacters')),
//     city: () =>
//       yup
//         .string()
//         .required(
//           i18n.t('joinNowForm.inputTitles.city') +
//             ' ' +
//             i18n.t('errors.required'),
//         )
//         .matches(/^[a-z ]+$/i, i18n.t('errors.validationSpecialCharacters')),
//     postalCode: () =>
//       yup
//         .string()
//         .required(
//           i18n.t('joinNowForm.inputTitles.postalCode') +
//             ' ' +
//             i18n.t('errors.required'),
//         )
//         .matches(zipRegExp, i18n.t('errors.zipCodeError')),
//     state: () =>
//       yup
//         .string()
//         .required(
//           i18n.t('joinNowForm.inputTitles.stateCode') +
//             ' ' +
//             i18n.t('errors.required'),
//         ),
//     streetAddress: () =>
//       yup
//         .string()
//         .required(
//           i18n.t('joinNowForm.inputTitles.address1') +
//             ' ' +
//             i18n.t('errors.required'),
//         ),
//     phoneForm: () =>
//       yup
//         .string()
//         .required(
//           i18n.t('joinNowForm.inputTitles.phone') +
//             ' ' +
//             i18n.t('errors.required'),
//         )
//         .matches(
//           /^[0-9!#$%^*_]+$/i,
//           i18n.t('errors.validationSpecialCharacters'),
//         )
//         .max(10)
//         .min(10),
//     apt: yup
//       .string()
//       .matches(
//         /^[a-z0-9!#$%^*_ .]+$/i,
//         i18n.t('errors.validationSpecialCharacters'),
//       ),
//     cardName: yup
//       .string()
//       .trim()
//       .required(errorMessages.required)
//       .matches(/^[a-z -]+$/i, i18n.t('errors.validationName')),
//   };
// };

export type FormFieldType =
  | 'phone'
  | 'firstName'
  | 'lastName'
  | 'address1'
  | 'address2'
  | 'city'
  | 'postalCode'
  | 'currentPassword'
  | 'newPassword'
  | 'email'
  | 'cardNumber'
  | 'name'
  | 'expDate'
  | 'securityCode';

export const textInputProps: Record<
  FormFieldType,
  Partial<FormTextInputType>
> = {
  firstName: {
    keyboardType: isIos ? 'name-phone-pad' : 'default',
    textContentType: 'givenName',
    returnKeyType: 'done',
  },
  lastName: {
    keyboardType: isIos ? 'name-phone-pad' : 'default',
    textContentType: 'familyName',
    returnKeyType: 'done',
  },
  address1: {
    autoComplete: 'street-address',
    keyboardType: 'name-phone-pad',
    textContentType: 'streetAddressLine1',
    returnKeyType: 'done',
  },
  address2: {
    keyboardType: 'default',
    textContentType: 'streetAddressLine2',
    returnKeyType: 'done',
  },
  city: {
    keyboardType: 'default',
    textContentType: 'addressCity',
    returnKeyType: 'done',
  },
  postalCode: {
    autoComplete: 'postal-code',
    keyboardType: 'numeric',
    textContentType: 'postalCode',
    returnKeyType: 'done',
  },
  phone: {
    autoComplete: 'tel',
    keyboardType: 'phone-pad',
    textContentType: 'telephoneNumber',
    returnKeyType: 'done',
  },
  email: {
    autoComplete: 'email',
    keyboardType: 'email-address',
    textContentType: 'emailAddress',
    returnKeyType: 'done',
    autoCapitalize: 'none',
  },
  currentPassword: {
    autoComplete: 'password',
    textContentType: 'password',
    returnKeyType: 'done',
    secureTextEntry: true,
  },
  newPassword: {
    autoComplete: 'password',
    textContentType: 'newPassword',
    returnKeyType: 'done',
    secureTextEntry: true,
  },
  cardNumber: {
    autoComplete: 'cc-number',
    keyboardType: 'numeric',
  },
  name: {
    autoComplete: 'name',
    textContentType: 'givenName',
    keyboardType: 'default',
  },
  expDate: {
    autoComplete: 'cc-exp',
    keyboardType: 'numeric',
  },
  securityCode: {
    autoComplete: 'cc-csc',
    keyboardType: 'numeric',
    secureTextEntry: true,
  },
};
