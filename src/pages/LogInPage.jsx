import { auth, signInWithEmailAndPassword } from "../utils/firebase";
import LogInForm from "../components/GlobalComponents/LogIn";

function LogInPage() {
  const logIn = async (formInstance) => {
    const values = formInstance.getFieldValue();
    const { username, email, password } = values;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      formInstance.resetFields();
    } catch (error) {
      console.log(error);
      formInstance.resetFields();
    }
  };
  return <LogInForm logIn={logIn} />;
}
export default LogInPage;
