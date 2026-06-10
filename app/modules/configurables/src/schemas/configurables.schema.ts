/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "appTagline",
      type: "string",
      required: false,
      label: "App Tagline",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "companyName",
      type: "string",
      required: false,
      label: "Company / Franchise Name",
    },
    {
      fieldName: "totalLocations",
      type: "number",
      required: false,
      label: "Total Locations Managed",
      min: 1,
      max: 10000,
    },
    {
      fieldName: "dashboardTitle",
      type: "string",
      required: false,
      label: "Dashboard Page Title",
    },
    {
      fieldName: "dashboardSubtitle",
      type: "string",
      required: false,
      label: "Dashboard Page Subtitle",
    },
    {
      fieldName: "userProfile",
      type: "object",
      required: false,
      label: "User Profile",
      fields: [
        { fieldName: "name", type: "string", required: false, label: "Full Name" },
        { fieldName: "role", type: "string", required: false, label: "Role / Title" },
        { fieldName: "initials", type: "string", required: false, label: "Initials" },
      ],
    },
    {
      fieldName: "showAISituationBanner",
      type: "boolean",
      required: false,
      label: "Show AI Situation Banner",
    },
    {
      fieldName: "showAIAssistantTeaser",
      type: "boolean",
      required: false,
      label: "Show AI Assistant Teaser Widget",
    },
    {
      fieldName: "showActivityFeed",
      type: "boolean",
      required: false,
      label: "Show Activity Feed",
    },
    {
      fieldName: "locationsPageTitle",
      type: "string",
      required: false,
      label: "Locations Page Title",
    },
    {
      fieldName: "locationsPageSubtitle",
      type: "string",
      required: false,
      label: "Locations Page Subtitle",
    },
  ],
};
