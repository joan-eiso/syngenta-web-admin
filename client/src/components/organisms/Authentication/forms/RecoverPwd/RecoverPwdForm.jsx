import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function RecoverPwdForm({ step, setStep }) {
  let FormComponent;
  switch (step) {
    case 1:
      FormComponent = Step1;
      break;
    case 2:
      FormComponent = Step2;
      break;
    case 3:
      FormComponent = Step3;
      break;
    default:
      break;
  }
  return (
    <FormComponent setStep={setStep} />
  )
}

export default RecoverPwdForm;