import NInput from "@/components/n-input";
import { Field } from "@taroify/core";

interface TaskNameProps {
  value: string;
  onChange?: (name: string, value: string) => void;
}

export default function TaskName(props: TaskNameProps) {
  return (
    <Field name='taskName'>
      <NInput
        value={props.value}
        onChange={(value) => props.onChange?.("taskName", value)}
        placeholder='任务名称'
      ></NInput>
    </Field>
  );
}
