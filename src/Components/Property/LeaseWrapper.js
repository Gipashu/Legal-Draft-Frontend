import { useParams } from "react-router-dom";
import {leases} from "./Property1";

const LeaseWrapper = () => {
  const { type } = useParams();
console.log("type here", type);
  const lease = leases.find((l) => l.type === type);

  if (!lease) {
    return <p style={{ color: "red" }}>Invalid lease type</p>;
  }

  if (!lease.component) {
    // console.error(`No component defined for lease type: ${type}`);
    return <p style={{ color: "red" }}>Component not found for</p>;
  }

  const FormComponent = lease.component;
  return <FormComponent formType={type} />;
};

export default LeaseWrapper;
