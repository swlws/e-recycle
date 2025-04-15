import { Field, Textarea } from '@taroify/core';
import { BaseEventOrig, InputProps } from '@tarojs/components';

interface RemarkProps {
  value: string;
  onChange?: (name: string, value: string) => void;
}

/**
 * 联系人
 * @param props
 * @returns
 */
export default function Remark(props: RemarkProps) {
  const handleChange = (event: BaseEventOrig<InputProps.inputEventDetail>) => {
    props.onChange?.('remark', event.detail.value);
  };

  return (
    <Field name="remark">
      <Textarea
        style={{ height: '48px' }}
        limit={50}
        placeholder="请输入备注"
        value={props.value}
        onChange={handleChange}
      />
    </Field>
  );
}
