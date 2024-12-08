const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="smax-w-[90%] md:container mx-auto">{children}</div>;
};

export default Container;
