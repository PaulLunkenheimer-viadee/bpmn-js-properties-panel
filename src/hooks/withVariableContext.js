import { getCloudVariablesForElement } from '@bpmn-io/extract-process-variables';

export function withVariableContext(Component) {
  return props => {
    const { bpmnElement, element } = props;

    // console.log(element, element.businessObject);
    const bo = (bpmnElement || element).businessObject;

    console.log(bpmnElement, element, bo);

    const variables = getCloudVariablesForElement(bo);

    console.log(variables);

    const context = variables.map(variable => {
      return {
        name: variable.name,
        info: 'Written in ' + variable.origin.map(origin => origin.name || origin.id).join(', '),

        // type: variable.hints.map(hint => hint.type).reduce((prev, current) => {
        //   if (current && (!prev || prev === current)) {
        //     return current;
        //   } else {
        //     return 'any';
        //   }
        // }, ''),

        // type: variable.scope.name || variable.scope.id
      };
    });

    return <Component { ...props } variables={ context }></Component>;
  };
}