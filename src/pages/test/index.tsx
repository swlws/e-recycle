import ChildPageLayout from '@/layout/child-page-layout';
import BeFormPublishTask from '@/business/form-publish-task';
import { ITaskInfo } from '@/typings/task';

const getDefaultFormValue = (): ITaskInfo => {
  return {
    person: '',
    phoneNumber: '',
    address: '',
    goods: [],
  };
};

export default function ChildPage() {
  let formValue: ITaskInfo = getDefaultFormValue();

  const handleFormValueChange = (newFormValue: ITaskInfo) => {
    formValue = newFormValue;
  };

  return (
    <ChildPageLayout>
      <BeFormPublishTask formValue={formValue} />
    </ChildPageLayout>
  );
}
