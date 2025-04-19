import ChildPageLayout from '@/layout/child-page-layout';
import BeFormPublishTask from '@/business/form-publish-task';
import CacheMgr from '@/cache';
import { ITaskInfo } from '@/typings/task';

export default function ChildPage() {
  const { nickName, phoneNumber } = CacheMgr.user.value;
  const defaultFormValue: Partial<ITaskInfo> = {
    person: nickName,
    phoneNumber,
  };

  return (
    <ChildPageLayout>
      <BeFormPublishTask formValue={defaultFormValue} />
    </ChildPageLayout>
  );
}
