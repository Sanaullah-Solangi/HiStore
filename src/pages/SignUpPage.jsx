import { auth, createUserWithEmailAndPassword } from "../utils/firebase";
import SignUpForm from "../components/GlobalComponents/SignUp";

function SignUpPage() {
  const signUp = async (formInstance) => {
    const values = formInstance.getFieldValue();
    const { username, email, password } = values;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      formInstance.resetFields();
    } catch (error) {
      console.log(error);
      formInstance.resetFields();
    }
  };
  return <SignUpForm signUp={signUp} />;
}
export default SignUpPage;
