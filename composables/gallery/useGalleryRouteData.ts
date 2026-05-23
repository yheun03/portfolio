import type { GalleryArchiveVariant } from '@composables/gallery/useGallery';
import { careerWorks, getCareerWorkById, getPersonalWorkById, personalWorksList } from '@data/works';

export function useGalleryRouteWorks(variant: GalleryArchiveVariant) {
    return variant === 'career' ? careerWorks : personalWorksList;
}

export function useGalleryRouteWork(variant: GalleryArchiveVariant, id: string) {
    const work = variant === 'career' ? getCareerWorkById(id) : getPersonalWorkById(id);

    if (!work) {
        throw createError({
            statusCode: 404,
            statusMessage: variant === 'career' ? 'Project not found' : 'Personal project not found',
        });
    }

    return work;
}
