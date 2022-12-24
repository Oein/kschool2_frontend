export default function Alert({
  children,
  title,
  onClose,
}: React.PropsWithChildren<{ title: string; onClose: () => void }>) {
  return (
    <>
      <div className="alert-container" onClick={onClose}>
        <div className="alert">
          <span
            className="title fontSize"
            style={{
              justifyContent: "left",
              fontSize: "20px",
              display: "inline",
            }}
          >
            이벤트 알림
          </span>
          <span className="close fontSize" onClick={onClose}>
            ❌
          </span>
          <div
            className="something fontSize"
            style={{
              fontSize: "20px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
