import { useState } from "react";
import Form from "./Form";
const AddCabin = () => {
  const [showForm, setShowForm] = useState(false);
  const showFormHandler = () => setShowForm((prev) => !prev);

  return (
    <>
      <div className="btn-container self-stretch flex justify-start w-full ">
        <button onClick={showFormHandler} className="btn ">
          Add Cabin
        </button>
      </div>

      {showForm && <Form handler={showFormHandler} />}
    </>
  );
};

export default AddCabin;
