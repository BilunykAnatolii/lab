import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocalFileEntity {
  @PrimaryGeneratedColumn('uuid')
  local_file_id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}
