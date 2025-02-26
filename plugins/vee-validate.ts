import * as VeeValidate from "vee-validate";
import * as AllRules from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VForm", VeeValidate.Form);
  nuxtApp.vueApp.component("VField", VeeValidate.Field);
  nuxtApp.vueApp.component("VErrorMessage", VeeValidate.ErrorMessage);
  const { $_ } = useNuxtApp();
  const rules: string[] = $_.keys(AllRules);
  $_.forEach(rules, (rule: string) => {
    VeeValidate.defineRule(rule, (AllRules as Record<string, any>)[rule]);
  });

  VeeValidate.defineRule("validName", (value: string) => {
    if (/^[\p{L}\s.\-ñÑ]+$/u.test(value)) {
      return true; // Validation passed
    }
    return "Invalid characters.";
  });

  VeeValidate.defineRule("validAge", (value: string | Date) => {
    const today = new Date();
    const minDate = new Date();
    const maxDate = new Date();

    minDate.setFullYear(today.getFullYear() - 120);
    maxDate.setFullYear(today.getFullYear() - 1);

    const inputDate = new Date(value);

    if (isNaN(inputDate.getTime())) {
      return "Invalid date";
    }
    if (inputDate < minDate || inputDate > maxDate) {
      return `Birthdate must be between ${
        minDate.toISOString().split("T")[0]
      } and ${maxDate.toISOString().split("T")[0]}`;
    }
    return true;
  });

  interface FieldValidationMetaInfo {
    field: string;
    name: string;
    label?: string;
    value: unknown;
    form: Record<string, unknown>;
    rule?: {
      name: string;
      params?: Record<string | number, unknown> | unknown[];
    };
  }
  // Customize global validation rules error message
  VeeValidate.configure({
    generateMessage: ({ field, rule }: FieldValidationMetaInfo) => {
      const param = rule?.params ? rule?.params[0] : "";
      switch (rule?.name) {
        case "email":
          return "Invalid email address";
        case "min":
          return `Must contain at least ${param} characters`;
        case "max":
          return `${$_.startCase(field)} must only contain ${param} characters`;
        case "required":
          return `Enter ${$_.startCase(field)}`;
        case "digits":
          return `${$_.startCase(field)} exceeds expected value`;
        case "phone_number":
          return `Invalid mobile number format`;
        case "select_required":
          return `Select ${$_.startCase(field)}`;
        case "strong_password":
          return "Password not strong enough";
        default:
          return `${field ? $_.startCase(field) : "This field"} is invalid`;
      }
    },
  });

  return {
    provide: { validate: VeeValidate },
  };
});
