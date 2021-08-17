const MainLayout = ({ children }) => {
  return (
    <>
      <h1>main layout</h1>
      <div className='content'>{children}</div>
    </>
  );
};

export default MainLayout;
