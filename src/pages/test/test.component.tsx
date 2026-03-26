import useTest from "./test.service";

const Test = () => {
  const { renderContent } = useTest();

  return <>{renderContent()}</>;
};

export default Test;
