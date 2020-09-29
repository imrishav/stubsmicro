import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("dasd", currentUser);
  return (
    <div>
      <h1>Landing Oage..</h1>
    </div>
  );
};

LandingPage.getInitialProps = async () => {
  const response = await axios.get("/api/users/currentuser");

  return response.data;
};

export default LandingPage;
