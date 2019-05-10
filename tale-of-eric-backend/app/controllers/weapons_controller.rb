class WeaponsController < ApplicationController
    def index
        @weapons = Weapon.all
        render json: @weapons
    end

    def show
        @weapon = Weapon.find(params[:id])
        render json: @weapon
    end

    def update
        @weapon = Weapon.find(params[:id])
        @weapon.update(weapon_params)
    end

    def create
        @weapon = Weapon.new(weapon_params)
        if @weapon.save
            render json: @weapon
        end
    end

    private
    def weapon_params
        params.permit(:name, :image, :damage)
    end
end
