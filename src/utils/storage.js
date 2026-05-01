import { defaultSiteConfig } from '../data/defaultSiteConfig.js'

const STORAGE_KEY = 'printmaster-site-config'
export const SITE_CONFIG_UPDATED_EVENT = 'site-config-updated'

const clone = (value) => JSON.parse(JSON.stringify(value))

const hasBrowserStorage = () => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage)
  } catch (error) {
    console.warn('O armazenamento local do navegador não está disponível.', error)
    return false
  }
}

const getArrayOrDefault = (value, fallback) => (Array.isArray(value) ? value : fallback)

const notifyConfigUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(SITE_CONFIG_UPDATED_EVENT))
  }
}

const mergeSiteConfig = (customConfig = {}) => {
  const baseConfig = clone(defaultSiteConfig)

  return {
    ...baseConfig,
    ...customConfig,
    colors: {
      ...baseConfig.colors,
      ...(customConfig.colors || {}),
    },
    about: {
      ...baseConfig.about,
      ...(customConfig.about || {}),
    },
    contact: {
      ...baseConfig.contact,
      ...(customConfig.contact || {}),
    },
    services: getArrayOrDefault(customConfig.services, baseConfig.services),
    gallery: getArrayOrDefault(customConfig.gallery, baseConfig.gallery),
    whyChooseUs: getArrayOrDefault(customConfig.whyChooseUs, baseConfig.whyChooseUs),
    testimonials: getArrayOrDefault(customConfig.testimonials, baseConfig.testimonials),
  }
}

export const getSiteConfig = () => {
  if (!hasBrowserStorage()) {
    return clone(defaultSiteConfig)
  }

  let savedConfig = null

  try {
    savedConfig = window.localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Não foi possível ler as configurações salvas.', error)
    return clone(defaultSiteConfig)
  }

  if (!savedConfig) {
    return clone(defaultSiteConfig)
  }

  try {
    return mergeSiteConfig(JSON.parse(savedConfig))
  } catch (error) {
    console.warn('Não foi possível carregar as configurações salvas.', error)
    return clone(defaultSiteConfig)
  }
}

export const saveSiteConfig = (config) => {
  const mergedConfig = mergeSiteConfig(config)

  if (!hasBrowserStorage()) {
    return mergedConfig
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedConfig))
    notifyConfigUpdate()
  } catch (error) {
    console.warn('Não foi possível salvar as configurações no navegador.', error)
  }

  return mergedConfig
}

export const resetSiteConfig = () => {
  if (hasBrowserStorage()) {
    window.localStorage.removeItem(STORAGE_KEY)
    notifyConfigUpdate()
  }

  return clone(defaultSiteConfig)
}

export const buildWhatsAppLink = (whatsappValue) => {
  const value = whatsappValue?.trim()

  if (!value) {
    return '#contato'
  }

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  const phoneNumber = value.replace(/\D/g, '')

  if (!phoneNumber) {
    return '#contato'
  }

  const message = encodeURIComponent('Olá! Gostaria de solicitar um orçamento.')

  return `https://wa.me/${phoneNumber}?text=${message}`
}
