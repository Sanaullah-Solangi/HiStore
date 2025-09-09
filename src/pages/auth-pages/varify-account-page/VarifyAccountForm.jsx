// IMPORTING ELEMENTS & COMPONENTS
import { Form } from "antd";

// CONTEXT
import FormInput from "../../../components/ui/FormInput";
import Button from "../../../components/ui/Button";
import Swal from "sweetalert2";
import GoogleLogin from "../../../components/ui/GoogleLogin";

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
const VarifyAccountForm = ({ resetPasswordViaEmail }) => {
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
          name={"otp"}
          message={"Please Input Your OTP"}
          label={"Verification code"}
          id={"otp"}
        />

        <p className="">
          Did not receive a code?{" "}
          <span className="text-red-800 font-bold ">Resend</span>
        </p>

        {/* SUBMIT BTN */}
        <Button type={"primary"} text={"Submit"} buttonVariant="contained" />
      </div>
    </Form>
  );
};

export default VarifyAccountForm;
