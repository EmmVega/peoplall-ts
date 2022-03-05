// import ColorTextFields from '../components/ColorTextFields'
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";

const Layout = (props: any) => {
   return (
      <>
         <PrimarySearchAppBar />
         {props.children}
      </>
   );
};

export default Layout;
