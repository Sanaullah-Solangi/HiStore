// IMPORTING ELEMENTS & COMPONENTS
import { Form } from "antd";

// CONTEXT
import FormInput from "../../../components/ui/FormInput";
import FormButton from "../../../components/ui/FormButton";
import Swal from "sweetalert2";
import LoginWithGoogle from "../../../components/ui/LoginWithGoogle";

// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  Swal.fire({
    customClass: {
      container: "sweatContainer",
      popup: "sweatPopup",
      title: "sweatTitle",
      htmlContainer: "sweatPara",
      confirmButton: "sweatBtn",
      cancelButton: "sweatBtn",
    },
    icon: "warning",
    title: "Sorry...",
    text: "Please fill in the email field.",
  });
};
// LOGIN FORM COMPONENT
const ForgotPasswordForm = ({ resetPasswordViaEmail }) => {
  const [form] = Form.useForm();
  return (
    // FORM WRAPPER
    <Form
      form={form}
      name="basic"
      className="md:mr-20 rounded-lg md:w-[90%] w-full flex flex-col justify-center items-center"
      initialValues={{
        remember: true,
      }}
      onFinish={() => {
        resetPasswordViaEmail(form);
      }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="flex flex-col w-full gap-5">
        {/* EMAIL INPUT */}
        <FormInput
          name={"email"}
          message={"Please Input Your Email"}
          label={"Email"}
          id={"email"}
        />

        {/* SUBMIT BTN */}
        <FormButton
          type={"primary"}
          text={"Submit"}
          buttonVariant="contained"
        />
      </div>

      {/* OR LOG IN WITH GOOGLE */}
      <LoginWithGoogle />
    </Form>
  );
};

export default ForgotPasswordForm;
