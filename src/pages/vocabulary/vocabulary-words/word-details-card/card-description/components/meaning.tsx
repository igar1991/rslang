import { BasicDescriptionSection } from './basic-description-section';

interface Props {
  device: string;
  textMeaning: string;
  textMeaningTranslate: string;
}

export const Meaning = ({ device, textMeaning, textMeaningTranslate }: Props) => {
  return <BasicDescriptionSection
    device={device}
    title={'Meaning'}
    original={textMeaning}
    translation={textMeaningTranslate}
  />;
};
