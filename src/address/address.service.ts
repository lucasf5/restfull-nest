import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(addressDto: Partial<Address>): Promise<Address> {
    const address = this.addressRepository.create(addressDto);
    return this.addressRepository.save(address);
  }

  async getAddressById(id: string): Promise<Address> {
    return this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async getAllAddresses(): Promise<Address[]> {
    return this.addressRepository.find({
      relations: ['user'],
    });
  }

  async deleteAddress(id: string): Promise<DeleteResult> {
    return this.addressRepository.delete(id);
  }
}
