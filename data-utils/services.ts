import { IServiceFull } from 'models/interfaces/services/service.interface';
import {
  IResidualService,
  IService,
} from 'models/interfaces/services/service.interface';
import { TLocales } from '../types/locales';

// Services temporarily hidden from the home page (currently unavailable).
// Their detail pages and cross-links remain intact; only the home page list is filtered.
const HIDDEN_HOME_SERVICE_PATHS = [
  'ekaer',
  'mobile-app-entwicklung',
  'ui-ux-design',
  'ki-forschung-entwicklung',
  'sprachassistenten',
];

export const getServicesShortInfo = (locale: string): IService[] => {
  const services = require(`/data/services/services.${locale}.json`);

  return services
    .filter((item: IService) => !HIDDEN_HOME_SERVICE_PATHS.includes(item.path))
    .map((item: IService) => ({
      name: item.name,
      path: item.path,
      iconUrl: item.iconUrl,
      shortDescription: item.shortDescription,
    }));
};

export const getSingleService = (locale: string, name: string) => {
  const services = require(`/data/services/services.${locale}.json`);

  return services.filter((item: IServiceFull) => item.path === name)[0];
};

export const getResidualServices = (
  locale: string,
  name: string,
): IResidualService[] => {
  const services = require(`/data/services/services.${locale}.json`);

  return services
    .filter((item: IResidualService) => item.path !== name)
    .map((item: IResidualService) => ({
      name: item.name,
      path: item.path,
      whiteIconUrl: item.whiteIconUrl,
      shortDescription: item.shortDescription,
    }));
};

export const getServicesPaths = (locales: TLocales) => {
  const translates = locales.flatMap((locale) => ({
    locale,
    data: require(`/data/services/services.${locale}.json`) as IService[],
  }));

  return translates.flatMap(({ data, locale }) =>
    data.map((item) => ({
      params: { name: item.path },
      locale,
    })),
  );
};
