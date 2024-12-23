declare module "*.vue" {
  import { DefineComponent } from "vue";
  import { debounce as lodashDebounce } from "lodash";

  const component: DefineComponent<{}, {}, any>;

  export default { component };

  export const debounce: typeof lodashDebounce;
}
