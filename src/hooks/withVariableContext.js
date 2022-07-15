import { getZeebeVariablesForElement } from '@bpmn-io/extract-process-variables';

export function withVariableContext(Component) {
  return props => {
    const { bpmnElement, element } = props;

    // console.log(element, element.businessObject);
    const bo = (bpmnElement || element).businessObject;

    const variables = getZeebeVariablesForElement(bo);

    const context = variables.map(variable => {
      return {
        name: variable.name,
        info: 'Written in ' + variable.origin.map(origin => origin.name || origin.id).join(', '),
      };
    });

    return <Component { ...props } variables={ context }></Component>;
  };
}