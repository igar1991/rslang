import { BasicDescriptionSection } from './basic-description-section';

interface Props {
  device: string;
  textExample: string;
  textExampleTranslate: string;
}

export const Example = ({ device, textExample, textExampleTranslate }: Props) => {
  return <BasicDescriptionSection
    device={device}
    title={'Example'}
    original={textExample}
    translation={textExampleTranslate}
  />;
};
