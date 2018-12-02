export default function checkValidityRecruiter(context) {

    let expstamp = localStorage.getItem("token_expiry");
    let currentStamp = Math.floor(Date.now() / 1000);
    
    if (expstamp === null) {
        context.props.history.push("/recruitersignin");
    } else {

      if (expstamp > currentStamp) {
        return "AOK"
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token_expiry");
        context.props.history.push("/recruitersignin"); 
      }
    }
  }
  