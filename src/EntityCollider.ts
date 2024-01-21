import { Entity } from './Entity';

export class EntityCollider {
  private entities: Set<Entity>;

  constructor(entities: Set<Entity>) {
    this.entities = entities;
  }

  check(subject: Entity) {
    this.entities.forEach((candidate) => {
      if (subject === candidate) {
        return;
      }

      if (subject.bounds.overlaps(candidate.bounds)) {
        subject.collides(candidate);
        candidate.collides(subject);
      }
    });
  }
}
