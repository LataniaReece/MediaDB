import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const useValidateMediaType = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (type !== "movies" && type !== "shows") {
      navigate("/not-found");
    }
  }, [type, navigate]);
};

export default useValidateMediaType;
