export default function Alert({
  children,
  title,
  onClose,
}: React.PropsWithChildren<{ title: string; onClose: () => void }>) {
  return (
    <>
      <div className="alert-container">
        <div className="alert">
          <span className="title fontSize">이벤트 알림</span>
          <span className="close fontSize" onClick={onClose}>
            ❌
          </span>
          <div className="something fontSize">{children}</div>
        </div>
      </div>
    </>
  );
}
