import WebsiteModuleHeader from "./WebsiteModuleHeader";

export default function WebsiteLayout({ children }) {
  return (
    <div>
      <WebsiteModuleHeader />
      {children}
    </div>
  );
}
