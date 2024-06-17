import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import { DeleteResult } from 'typeorm';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Body() createAddressDto: Partial<Address>,
  ): Promise<Address> {
    return this.addressService.createAddress(createAddressDto);
  }

  @Get()
  async getAddresses(): Promise<Address[]> {
    return this.addressService.getAllAddresses();
  }

  @Get(':id')
  async getAddressById(@Param('id') id: string): Promise<Address> {
    return this.addressService.getAddressById(id);
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: string): Promise<DeleteResult> {
    return this.addressService.deleteAddress(id);
  }
}
