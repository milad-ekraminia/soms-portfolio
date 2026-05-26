import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";

const UpdateDataModal = () => {
  return (
    <div className="update-data-modal">
      <SelectInput
        placeholder="Şebeke Unsuru giriniz"
        label="Şebeke Unsuru"
        setValue={() => {}}
        options={[]}
      />
      <SelectInput
        placeholder="Kesinti Sebebi giriniz"
        label="Kesinti Sebebi"
        setValue={() => {}}
        options={[]}
      />
      <SelectInput
        placeholder="Kesinti Tipi giriniz"
        label="Kesinti Tipi"
        setValue={() => {}}
        options={[]}
      />
      <SelectInput
        placeholder="Kesinti Kaynağı giriniz"
        label="Kesinti Kaynağı"
        setValue={() => {}}
        options={[]}
      />
      <SelectInput
        placeholder="Kesintinin Nesne Türü giriniz"
        label="Kesintinin Nesne Türü"
        setValue={() => {}}
        options={[]}
      />
      <TextArea label="Açıklama" placeholder="Açıklama giriniz" />
    </div>
  );
};

export default UpdateDataModal;
