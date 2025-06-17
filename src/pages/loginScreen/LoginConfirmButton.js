import { Button } from "@mui/material";
import axios from "axios";
export function LoginConfirmButton({ email, password }) {
  /*function LoginConfirmation(email, password) {
    axios.post("api_url", { email: email, password: password });
    .then((response) => {response.status === 204 ? redirect() : error()} )
  }*/

  return (
    <div className="relative top-28">
      <Button
        size="large"
        sx={{ padding: "15px 50px", alignSelf: "center" }}
        variant="contained"
      >
        ENTRAR
      </Button>
    </div>
  );
}
