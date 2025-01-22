import * as VeeValidate from "vee-validate";
import * as AllRules from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VForm", VeeValidate.Form);
  nuxtApp.vueApp.component("VField", VeeValidate.Field);
  nuxtApp.vueApp.component("VErrorMessage", VeeValidate.ErrorMessage);
  const { $_ } = useNuxtApp();
  const rules: string[] = $_.keys(AllRules);
  Object.keys(AllRules).forEach((rule) => {
    VeeValidate.defineRule(rule, AllRules[rule]);
  });
  VeeValidate.defineRule("phone_number", (value: string) => {
    if (!/^(09|\+639)\d{9}$/.test(value)) {
      return "This field must be a valid phone_number";
    }
    return true;
  });

  VeeValidate.defineRule("has_number", (value: string) => {
    if (!/\d/.test(value)) {
      return "Must contain at least one number";
    }
    return true;
  });
  VeeValidate.defineRule("has_special_char", (value: string) => {
    if (!/[!@#$%^&*]/.test(value)) {
      return "Must contain at least one special character";
    }
    return true;
  });
  VeeValidate.defineRule("has_upper_lower_case", (value: string) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
      return "Must contain both uppercase and lowercase characters";
    }
    return true;
  });
  VeeValidate.defineRule("no_spaces", (value: string) => {
    if (/\s/g.test(value)) {
      return "This field cannot contain any spaces.";
    }
    return true;
  });

  VeeValidate.defineRule("ph_phone_number", (value: string) => {
    if (!/^\+639\d{9}$/g.test(value)) {
      return "Invalid mobile number format";
    }
    return true;
  });

  VeeValidate.defineRule("select_required", (value: string) => {
    if ($_.isArray(value)) {
      return !value.length ? false : true;
    }
    if (!value) {
      return false;
    }
    return true;
  });

  VeeValidate.defineRule(
    "confirm_password",
    (value: string, [otherValue]: Array<string>) => {
      if (value !== otherValue) {
        return "Passwords do not match";
      }
      return true;
    }
  );

  VeeValidate.defineRule("strong_password", (value: string) => {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!pattern.test(value)) {
      return "Password not strong enough";
    }
    if (value == null) {
      return true;
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
