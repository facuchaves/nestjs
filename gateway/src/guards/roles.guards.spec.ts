import { RolesGuard } from './roles.guard';
import { Request, Response, NextFunction } from 'express';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('User middleware', () => {

  describe('Happy paths', () => {
    
    it(`shoud acept user with admin rol`, async () => {
      const reflector : Reflector = {
        get: ( propertyName : String , any) => (['admin'])
      } as Reflector

      const rolesGuard : RolesGuard = new RolesGuard( reflector )

      const context : ExecutionContext = {
        switchToHttp: () => (
          {
            getRequest: () => { return { user: { roles: ['admin'] } } }
          }
        ),
        getHandler: () => {}
      } as ExecutionContext

      expect( rolesGuard.canActivate(context) ).toBeTruthy();
    });
    
    it(`shoud deny user with another rol`, async () => {
      const reflector : Reflector = {
        get: ( propertyName : String , any) => (['admin'])
      } as Reflector

      const rolesGuard : RolesGuard = new RolesGuard( reflector )

      const context : ExecutionContext = {
        switchToHttp: () => (
          {
            getRequest: () => { return { user: { roles: ['ro'] } } }
          }
        ),
        getHandler: () => {}
      } as ExecutionContext

      expect( rolesGuard.canActivate(context) ).toBeFalsy();
    });

    it(`shoud deny user without rol`, async () => {
      const reflector : Reflector = {
        get: ( propertyName : String , any) => (['admin'])
      } as Reflector

      const rolesGuard : RolesGuard = new RolesGuard( reflector )

      const context : ExecutionContext = {
        switchToHttp: () => (
          {
            getRequest: () => { return { user: { roles: [] } } }
          }
        ),
        getHandler: () => {}
      } as ExecutionContext

      expect( rolesGuard.canActivate(context) ).toBeFalsy();

    });
  
    it(`shoud accept user without rol`, async () => {
      const reflector : Reflector = {
        get: ( propertyName : String , any) => ([])
      } as Reflector

      const rolesGuard : RolesGuard = new RolesGuard( reflector )

      const context : ExecutionContext = {
        switchToHttp: () => (
          {
            getRequest: () => { return { user: { roles: [] } } }
          }
        ),
        getHandler: () => {}
      } as ExecutionContext

      expect( rolesGuard.canActivate(context) ).toBeTruthy();

    });
  })

});
