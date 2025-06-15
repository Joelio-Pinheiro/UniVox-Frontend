import UnivoxFullIcon from "../../icons/UnivoxFullIcon.png";

export function LoginScreenHead(){
    return (
      <div className=" relative h-56">
        <img
          className=" relative top-4 w-84 h-24"
          src={UnivoxFullIcon}
          alt="Univox_label_1"
        />
        <h1 className=" relative text-center top-8 text-4xl font-medium">
          Entre na sua conta
        </h1>
      </div>
    );
}