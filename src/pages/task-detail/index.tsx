import BeFormPublishTask from '@/business/form-publish-task';
import ChildPageLayout from '@/layout/child-page-layout';

export default function TaskDetail() {
  return (
    <ChildPageLayout>
      <BeFormPublishTask readonly={true}></BeFormPublishTask>;
    </ChildPageLayout>
  );
}
