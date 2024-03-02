import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../model/users.entity';
import { UserDto } from './Dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(q: UserDto) {
    let queryBuilder = this.userRepository.createQueryBuilder('user');

    // Apply filters
    if (q?.name) {
      queryBuilder.andWhere('LOWER(user.name) LIKE LOWER(:name)', {
        name: `%${q.name}%`,
      });
    }
    if (q?.age) {
      queryBuilder.andWhere('user.age = :age', { age: q.age });
    }
    if (q?.min_age && q?.max_age) {
      queryBuilder.andWhere('user.age BETWEEN :minAge AND :maxAge', {
        minAge: q.min_age,
        maxAge: q.max_age,
      });
    }
    if (q?.email) {
      queryBuilder.andWhere('LOWER(user.email) LIKE LOWER(:email)', {
        email: `%${q.email}%`,
      });
    }
    if (q?.start_date && q?.end_date) {
      queryBuilder.andWhere('user.dob BETWEEN :startDate AND :endDate', {
        startDate: q.start_date,
        endDate: q.end_date,
      });
    }

    // Sorting
    if (q?.sort_field) {
      const sortField = q.sort_field || 'id';
      const sortOrder = q.sort_order || 'ASC';
      queryBuilder.orderBy(
        `user.${sortField}`,
        sortOrder.toUpperCase() as 'ASC' | 'DESC',
      );
    }

    // Count total records
    const totalCount = await queryBuilder.getCount();

    // Apply pagination
    if (q?.take) {
      queryBuilder.take(q.take);
    }
    if (q?.skip !== undefined) {
      const skip = q.take * q.skip;
      queryBuilder.skip(skip);
    }

    // Execute query to get paginated results
    const results = await queryBuilder.getMany();

    return { totalCount, results };
  }
}
