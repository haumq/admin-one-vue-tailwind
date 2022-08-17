import tooltipDirective from "./Tooltip/index";

// register all directives
const directives = (app) => {
  tooltipDirective(app);
};

export default directives;
