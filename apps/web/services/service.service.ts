import type { Service } from "@shafiq-info/types";
import servicesData from "@data/services.json";

const services = servicesData as Service[];

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return services.find((service) => service.slug === slug);
}
