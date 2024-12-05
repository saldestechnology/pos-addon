import { Input } from "@/components/ui/input";
import Modal from "../Modal";
import { Select } from "@/components/ui/dropdown";

interface AddProductModalProps {
  show: boolean;
  onClose: (close: boolean) => void;
}

export default function AddProductModal({
  show,
  onClose,
}: AddProductModalProps) {
  if (!show) return null;

  return (
    <Modal title="Add Product" onClose={() => onClose(false)}>
      <div className="px-4 py-2">
        <Input id="name" label="Name" />
      </div>
      <div className="px-4 py-2">
        <Input id="description" label="Name" />
      </div>
      <div className="px-4 py-2">
        <Select
          label="Flavor"
          options={[
            {
              value: "",
              label: "Select a flavor",
            },
            {
              value: "vanilla",
              label: "Vanilla",
            },
            {
              value: "chocolate",
              label: "Chocolate",
            },
          ]}
          value={"value"}
          onChange={() => {}}
          placeholder="Select a flavor"
        />
      </div>
    </Modal>
  );
}
