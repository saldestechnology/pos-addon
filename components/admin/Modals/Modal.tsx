import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ModalProps {
  title: string;
  onClose: () => void;
}

export default function Modal({
  title,
  onClose,
  children,
}: React.PropsWithChildren<ModalProps>) {
  return (
    <>
      {/* -top-6 is a hack because I can't figure out how tailwind adds space-y-6 to this div */}
      <div className="fixed inset-0 -top-6 z-50 my-0 flex items-center justify-center space-y-3 p-4">
        <div
          onClick={onClose}
          className="animate-fade absolute inset-0 bg-black/30 backdrop-blur-md"
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-slide-up-fade relative w-full max-w-3xl"
        >
          <Card>
            <CardHeader>{title}</CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
