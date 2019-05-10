class EnemiesController < ApplicationController
    def index
        @enemies = Enemy.all
        render json: @enemies
    end

    def show
        @enemy = Enemy.find(params[:id])
        render json: @enemy
    end

    def update
        @enemy = Enemy.find(params[:id])
        @enemy.update(enemy_params)
        render json: @enemy
    end


    def create
        @enemy = Enemy.new(enemy_params)
        if @enemy.save
            render json: @enemy
        end
    end

    private
    def enemy_params
        params.permit(:name, :image, :health)
    end

end
