export interface IServiceFeatureParagraph {
  text: string;
  list?: string[];
}

export interface IServiceBenefit {
  imgUrl: string;
  text: string;
}

export interface IServiceFeature {
  title: string;
  paragraphs: IServiceFeatureParagraph[];
}

export interface IService {
  path: string;
  name: string;
  shortDescription: string;
  iconUrl?: string;
}

export interface IResidualService extends IService {
  whiteIconUrl?: string;
}

export interface IServiceMeta {
  title: string;
  description: string;
}

export interface IServiceFull extends IResidualService {
  bannerUrl: string;
  description: string;
  subtitle: string;
  mainTexts: IServiceFeatureParagraph[];
  features: IServiceFeature[];
  benefits: IServiceBenefit[];
  meta?: IServiceMeta;
}
