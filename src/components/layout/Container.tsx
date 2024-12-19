const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[95%] md:container mx-auto">{children}</div>;
};

export default Container;
