import { fullName, phone, email } from '../state/ducks/user/selectors';

export const handlePrefills = (form, user, handlePrefillChange) => {
  const prefillName = fullName(user);
  if (!form.contact_name) {
    handlePrefillChange('contact_name', prefillName);
  }
  const prefillPhone = phone(user);
  if (!form.contact_phone) {
    handlePrefillChange('contact_phone', prefillPhone);
  }
  const prefillEmail = email(user);
  if (!form.contact_email) {
    handlePrefillChange('contact_email', prefillEmail);
  }
};
